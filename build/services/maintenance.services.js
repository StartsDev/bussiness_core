"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenanceServ = exports.updateMaintenanceServ = exports.getMaintByIdServ = exports.getMainByEquipment = exports.getMaintByUserServ = exports.getMaintenancesServ = exports.createMaintenanceServ = void 0;
const maintenance_interface_1 = require("./../interfaces/maintenance.interface");
const Equipment = require("../models/equipment");
const Maintenance = require("../models/maintenance");
const Location = require("../models/location");
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");
const axios_1 = __importDefault(require("axios"));
const moment = require("moment");
// Transform data maintenance format function
const transObjMaintenance = (arr) => {
    const linearDatap = [];
    for (const maintenance of arr) {
        const maintData = maintenance.get({ plain: true });
        const equipment = maintenance.Equipment;
        const location = equipment.Location;
        const headquarter = location.Headquarter;
        const client = headquarter.Client;
        maintData.equipment = equipment.get({ plain: true });
        maintData.location = location.get({ plain: true });
        maintData.headquarter = headquarter.get({ plain: true });
        maintData.client = client.get({ plain: true });
        delete maintData.Equipment;
        delete maintData.equipment.Location;
        delete maintData.location.Headquarter;
        delete maintData.headquarter.Client;
        linearDatap.push(maintData);
    }
    return linearDatap;
};
// Create a manteinance
const createMaintenanceServ = async (maint) => {
    let techName_;
    let techNumIdent_;
    try {
        const { activities, voltage_on_L1L2, voltage_on_L1L3, voltage_on_L2L3, voltage_control, suction_pressure, amp_engine_1, amp_engine_2, amp_engine_3, amp_engine_4, amp_engine_evap, compressor_1_amp_L1, compressor_1_amp_L2, compressor_1_amp_L3, compressor_2_amp_L1, compressor_2_amp_L2, compressor_2_amp_L3, supply_temp, return_temp, ater_in_temp, water_out_temp, sprinkler_state, float_state, discharge_pressure, service_hour, service_date, photos, customer_sign, tech_sign, customerId, observations, additional_remarks, equipmentId, techId, techName, techNumId, role } = maint;
        if (!techId) {
            return {
                msg: "Como Administrador o Super_Usuario debe asociar a un técnico...",
                success: false,
            };
        }
        const findEquipment = await Equipment.findOne({
            where: { id: equipmentId },
        });
        if (!findEquipment) {
            return {
                msg: "El equipo no está registrado...",
                success: false,
            };
        }
        // Validation equipment belong to client
        const client = await Client.findByPk(customerId, {
            include: {
                model: Headquarter,
                as: "headquarters",
                include: {
                    model: Location,
                    as: "locations",
                    include: {
                        model: Equipment,
                        as: "equipments",
                        where: { id: equipmentId },
                    },
                },
            },
        });
        const clientData = client.get({ plain: true });
        if (!(clientData &&
            clientData.headquarters.length > 0)) {
            return {
                msg: "El equipo no le pertenece al cliente...",
                success: false,
            };
        }
        const customer = {
            id: clientData.id,
            businessName: clientData.businessName,
            nit: clientData.nit,
            address: clientData.address,
            email: clientData.email,
            phone: clientData.phone,
        };
        // Valitation hour maintenance
        /*  const findMaintenance = await Maintenance.findOne({
          where: { service_hour },
        });
    
        if (findMaintenance) {
          return {
            msg: "Ya existe un servicio registrado a esa hora...",
            success: false,
          };
        } */
        // Verificar si Tech Id existe y si su rol es de tecnico
        if (role !== "Tecnico") {
            const URL = process.env.URL_PRODUCTION_AUTH || process.env.URL_DEVELOP_AUTH;
            const baseUrl = `${URL}/user/get-user`;
            const id = techId;
            const response = await axios_1.default.get(`${baseUrl}/${id}`);
            const userData = response.data;
            if (!userData.findUser) {
                return {
                    msg: "El técnico no existe...",
                    success: false,
                };
            }
            if (userData.findUser.Role.role !== "Tecnico") {
                return {
                    msg: "El rol debe ser técnico...",
                    success: false,
                };
            }
            techName_ = `${userData.findUser.firstName} ${userData.findUser.lastName}`;
            techNumIdent_ = userData.findUser.numIdent;
        }
        // Validation quantiy maintenances status "En proceso"
        const maintCount = await Maintenance.count({
            where: {
                delete: false,
                "tech.techId": techId,
                status: maintenance_interface_1.StatusOption.inProcess,
            },
        });
        if (maintCount === 5) {
            return {
                msg: "Sr. Técnico, tiene 5 servicios en estado en proceso, por favor firme y confirme al menos uno para poder registrar otro servicio...",
                success: false,
            };
        }
        const maintenance = await Maintenance.create({
            activities,
            voltage_on_L1L2,
            voltage_on_L1L3,
            voltage_on_L2L3,
            voltage_control,
            suction_pressure,
            amp_engine_1,
            amp_engine_2,
            amp_engine_3,
            amp_engine_4,
            amp_engine_evap,
            compressor_1_amp_L1,
            compressor_1_amp_L2,
            compressor_1_amp_L3,
            compressor_2_amp_L1,
            compressor_2_amp_L2,
            compressor_2_amp_L3,
            supply_temp,
            return_temp,
            ater_in_temp,
            water_out_temp,
            sprinkler_state,
            float_state,
            discharge_pressure,
            service_hour,
            service_date: moment(service_date).format('YYYY-MM-DD'),
            customer_sign,
            tech_sign,
            customerId,
            photos,
            tech: {
                techId,
                techName: role !== "Tecnico" ? techName_ : techName,
                techNumId: role !== "Tecnico" ? techNumIdent_ : techNumId,
            },
            observations,
            additional_remarks,
            equipmentId,
        });
        return {
            msg: "Servicio registrado satisfactoriamente...",
            maintenance,
            customer,
            success: true,
        };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createMaintenanceServ = createMaintenanceServ;
// Get maintenances
const getMaintenancesServ = async (page, pageSize) => {
    try {
        let maintenances;
        let totalPages = 0;
        if (page && pageSize) {
            const offset = (page - 1) * pageSize;
            maintenances = await Maintenance.findAll({
                offset,
                limit: pageSize,
                where: { delete: false },
                attributes: { exclude: ["updatedAt", "delete"] },
                order: [["service_date", "DESC"]],
                include: [
                    {
                        model: Equipment,
                        attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                        include: [
                            {
                                model: Location,
                                attributes: {
                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                },
                                include: [
                                    {
                                        model: Headquarter,
                                        attributes: {
                                            exclude: ["id", "createdAt", "updatedAt", "status"],
                                        },
                                        include: [
                                            {
                                                model: Client,
                                                attributes: {
                                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!maintenances) {
                return {
                    msg: "No hay mantenimientos registrados...",
                    success: false,
                };
            }
            const maintenancesFormat = transObjMaintenance(maintenances);
            const totalMaintenances = await Maintenance.count({
                where: { delete: false }
            });
            totalPages = Math.ceil(totalMaintenances / pageSize);
            return {
                maintenances: maintenancesFormat,
                totalCount: maintenancesFormat.length,
                totalPages,
                success: true,
            };
        }
        else {
            maintenances = await Maintenance.findAll({
                where: { delete: false },
                attributes: { exclude: ["updatedAt", "delete"] },
                order: [["service_date", "DESC"]],
                include: [
                    {
                        model: Equipment,
                        attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                        include: [
                            {
                                model: Location,
                                attributes: {
                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                },
                                include: [
                                    {
                                        model: Headquarter,
                                        attributes: {
                                            exclude: ["id", "createdAt", "updatedAt", "status"],
                                        },
                                        include: [
                                            {
                                                model: Client,
                                                attributes: {
                                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!maintenances) {
                return {
                    msg: "No hay mantenimientos registrados...",
                    success: false,
                };
            }
            const maintenancesFormat = transObjMaintenance(maintenances);
            return {
                maintenances: maintenancesFormat,
                totalCount: maintenances.length,
                success: true,
            };
        }
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
exports.getMaintenancesServ = getMaintenancesServ;
// Get maintenances by user (tech-client) (Home)
const getMaintByUserServ = async (user, page, pageSize) => {
    try {
        let maintenanceTech;
        if (page && pageSize) {
            const offset = (page - 1) * pageSize;
            maintenanceTech = await Maintenance.findAll({
                offset,
                limit: pageSize,
                where: user.role === "Tecnico"
                    ? { "tech.techId": user.techId, delete: false }
                    : { customerId: user.techId, delete: false },
                attributes: { exclude: ["updatedAt", "tech"] },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Equipment,
                        attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                        include: [
                            {
                                model: Location,
                                attributes: {
                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                },
                                include: [
                                    {
                                        model: Headquarter,
                                        attributes: {
                                            exclude: ["id", "createdAt", "updatedAt", "status"],
                                        },
                                        include: [
                                            {
                                                model: Client,
                                                attributes: {
                                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!maintenanceTech) {
                return {
                    msg: "No hay mantenimientos registrados para este usuario...",
                    success: false,
                };
            }
            const maintenanceUser = transObjMaintenance(maintenanceTech);
            return {
                maintenanceUser,
                totalCount: maintenanceUser.length,
                success: true,
            };
        }
        else {
            maintenanceTech = await Maintenance.findAll({
                where: user.role === "Tecnico"
                    ? { "tech.techId": user.techId, delete: false }
                    : { customerId: user.techId, delete: false },
                order: [["createdAt", "DESC"]],
                attributes: { exclude: ["createdAt", "updatedAt", "tech"] },
                include: [
                    {
                        model: Equipment,
                        attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                        include: [
                            {
                                model: Location,
                                attributes: {
                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                },
                                include: [
                                    {
                                        model: Headquarter,
                                        attributes: {
                                            exclude: ["id", "createdAt", "updatedAt", "status"],
                                        },
                                        include: [
                                            {
                                                model: Client,
                                                attributes: {
                                                    exclude: ["id", "createdAt", "updatedAt", "status"],
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!maintenanceTech) {
                return {
                    msg: "No hay mantenimientos registrados para este usuario...",
                    success: false,
                };
            }
            const maintenanceUser = transObjMaintenance(maintenanceTech);
            return {
                maintenanceUser,
                totalCount: maintenanceUser.length,
                success: true,
            };
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getMaintByUserServ = getMaintByUserServ;
// Get maintenance by equipment
const getMainByEquipment = async (equip) => {
    try {
        const equipment = await Equipment.findOne({
            where: { id: equip.equipmentId },
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt", "status"] },
            include: {
                model: Maintenance,
                as: "maintenances",
                order: [["createdAt", "DESC"]],
                attributes: { exclude: ["createdAt", "updatedAt", "delete"] },
            },
        });
        if (!equipment) {
            return {
                msg: "El equipo no esta registrado...",
                success: false,
            };
        }
        return { equipment, success: true };
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
exports.getMainByEquipment = getMainByEquipment;
// Get one maintenance by id
const getMaintByIdServ = async (maint) => {
    try {
        const maintenance = await Maintenance.findOne({
            where: { id: maint.id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Equipment,
                    attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                    include: [
                        {
                            model: Location,
                            attributes: {
                                exclude: ["id", "createdAt", "updatedAt", "status"],
                            },
                            include: [
                                {
                                    model: Headquarter,
                                    attributes: {
                                        exclude: ["id", "createdAt", "updatedAt", "status"],
                                    },
                                    include: [
                                        {
                                            model: Client,
                                            attributes: {
                                                exclude: ["id", "createdAt", "updatedAt", "status"],
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!maintenance) {
            return {
                msg: "Mantenimiento no registrado",
                success: false,
            };
        }
        return { maintenance, succes: true };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getMaintByIdServ = getMaintByIdServ;
// Update maintenance
const updateMaintenanceServ = async (id, maint) => {
    try {
        const { activities, voltage_on_L1L2, voltage_on_L1L3, voltage_on_L2L3, voltage_control, suction_pressure, amp_engine_1, amp_engine_2, amp_engine_3, amp_engine_4, amp_engine_evap, compressor_1_amp_L1, compressor_1_amp_L2, compressor_1_amp_L3, compressor_2_amp_L1, compressor_2_amp_L2, compressor_2_amp_L3, supply_temp, return_temp, water_in_temp, water_out_temp, sprinkler_state, float_state, discharge_pressure, service_hour, service_date, customer_sign, tech_sign, customerId, photos, observations, additional_remarks, equipmentId, rolName, status, } = maint;
        // Validate maintenance
        const maintFound = await Maintenance.findOne({ where: { id } });
        if (!maintFound) {
            return {
                msg: "Mantenimiento no válido...",
                success: false,
            };
        }
        // Validate Maintenance state & user autorization role
        if (maintFound.dataValues.status === "En proceso" &&
            rolName != "Tecnico" &&
            rolName != "Super_Usuario") {
            return {
                msg: "El administrador ni el cliente pueden modificar un mantenimiento en proceso...",
                success: false,
            };
        }
        if (maintFound.dataValues.status === "Completado" &&
            rolName != "Administrador" &&
            rolName != "Super_Usuario" &&
            rolName != "Cliente") {
            return {
                msg: "El técnico no puede modificar un mantenimiento completado...",
                success: false,
            };
        }
        if (maintFound.dataValues.status === "Confirmado" &&
            rolName != "Super_Usuario") {
            return {
                msg: "No es posible actualizar un mantenimiento confirmado...",
                success: false,
            };
        }
        // Validate client
        const clientFound = await Client.findOne({
            where: { id: customerId },
        });
        if (!clientFound) {
            return {
                msg: "Cliente no registado...",
                success: false,
            };
        }
        // Validate equipment
        const equipFound = await Equipment.findOne({
            where: { id: equipmentId },
        });
        if (!equipFound) {
            return {
                msg: "Equipo no registado...",
                success: false,
            };
        }
        // Update maintenance customer sign by client
        if (rolName === "Cliente" && maintFound.dataValues.tech_sign != null) {
            const updateMaintenance = await Maintenance.update({ customer_sign: customer_sign, status: "Confirmado" }, {
                where: {
                    id,
                },
                returning: true,
            });
            if (updateMaintenance <= 0) {
                return {
                    msg: "Actualización de firma no realizada...",
                    success: false,
                };
            }
            // Return maintenace sign updated
            const maintenance = await Maintenance.findOne({ where: { id } });
            if (!updateMaintenance) {
                return {
                    msg: "El mantenimiento no esta definido...",
                    success: false,
                };
            }
            return {
                msg: "Firma actualizada...",
                maintenance,
                success: true,
            };
        }
        if (rolName !== "Cliente") {
            // Update maintenance other roles != Client
            if (customer_sign) {
                return {
                    msg: "No puede firmar por el cliente...",
                    success: false,
                };
            }
            const updateMaintenance = await Maintenance.update({
                activities,
                voltage_on_L1L2,
                voltage_on_L1L3,
                voltage_on_L2L3,
                voltage_control,
                suction_pressure,
                amp_engine_1,
                amp_engine_2,
                amp_engine_3,
                amp_engine_4,
                amp_engine_evap,
                compressor_1_amp_L1,
                compressor_1_amp_L2,
                compressor_1_amp_L3,
                compressor_2_amp_L1,
                compressor_2_amp_L2,
                compressor_2_amp_L3,
                supply_temp,
                return_temp,
                water_in_temp,
                water_out_temp,
                sprinkler_state,
                float_state,
                discharge_pressure,
                service_hour,
                service_date,
                tech_sign,
                customerId,
                photos,
                observations,
                additional_remarks,
                equipmentId,
                status,
            }, {
                where: {
                    id,
                },
                returning: true,
            });
            if (updateMaintenance <= 0) {
                return {
                    msg: "Actualización no realizada...",
                    success: false,
                };
            }
            // Return maintenace updated
            const maintenance = await Maintenance.findOne({ where: { id } });
            if (!updateMaintenance) {
                return {
                    msg: "Actualización no es correcta...",
                    success: false,
                };
            }
            return {
                msg: "Mantenimiento actualizado...",
                maintenance,
                success: true,
            };
        }
        else {
            return {
                msg: "Su rol es de cliente, no puede modificar datos...",
                success: false,
            };
        }
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
exports.updateMaintenanceServ = updateMaintenanceServ;
// Delete maintenance
const deleteMaintenanceServ = async (id) => {
    try {
        const findMaint = await Maintenance.findOne({ where: { id } });
        if (findMaint.dataValues.delete) {
            return {
                msg: "Mantenimiento no registrado",
                success: false,
            };
        }
        if (!findMaint) {
            return {
                msg: "Mantenimiento desconocido...",
                success: false,
            };
        }
        if (findMaint.dataValues.status === "Confirmado") {
            return {
                msg: "No es posible eliminar un mantenimiento confirmado",
                success: false,
            };
        }
        const deletedMaintenance = await Maintenance.update({ delete: true }, {
            where: {
                id,
            },
        });
        if (!deletedMaintenance) {
            return {
                msg: "No se pudo eliminar el mantenimiento",
                success: false,
            };
        }
        return {
            msg: "Mantenimiento eliminado con exito...",
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.deleteMaintenanceServ = deleteMaintenanceServ;
