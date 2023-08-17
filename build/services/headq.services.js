"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeadServ = exports.allHeadClientServ = exports.getOneHeadServ = exports.updateHeadServ = exports.getHeadServ = exports.createHeadServ = void 0;
const Headquarter = require("../models/headquarter");
const Client = require("../models/client");
const createHeadServ = async (head) => {
    try {
        const findClient = await Client.findOne({
            where: { id: head.clientId },
        });
        if (!findClient) {
            return {
                msg: "El Id del cliente no existe...",
            };
        }
        const findHead = await Headquarter.findOne({
            where: { headName: head.headName },
        });
        if (findHead) {
            return {
                msg: "Esta sede ya existe",
            };
        }
        const newHead = await Headquarter.create(head);
        return {
            msg: "Sede registrada satisfactoriamente...",
            data: newHead,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.createHeadServ = createHeadServ;
const getHeadServ = async () => {
    try {
        const headquarters = await Headquarter.findAll({
            where: { status: false },
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Client,
                    attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                },
            ],
        });
        return {
            data: headquarters,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getHeadServ = getHeadServ;
const getOneHeadServ = async (head) => {
    try {
        const findHead = await Headquarter.findOne({
            where: { id: head },
        });
        if (!head) {
            return {
                msg: "Esta sede no existe",
            };
        }
        return {
            client: findHead,
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getOneHeadServ = getOneHeadServ;
const allHeadClientServ = async (user) => {
    try {
        const hedClient = await Headquarter.findAll({
            where: { clientId: user },
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Client,
                    attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
                },
            ],
        });
        if (!hedClient) {
            return {
                msg: "Sedes no hay con este cliente",
                users: [],
            };
        }
        return { data: hedClient };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.allHeadClientServ = allHeadClientServ;
const updateHeadServ = async (id, headq) => {
    try {
        const headFound = await Headquarter.findOne({ where: { id } });
        if (!headFound) {
            return {
                msg: "Sede no válida",
            };
        }
        const clientFound = await Client.findOne({
            where: { id: headq.clientId },
        });
        if (!clientFound) {
            return {
                msg: "Cliente no válido",
            };
        }
        const [updateHead] = await Headquarter.update(headq, {
            where: {
                id,
            },
            returning: true,
        });
        if (updateHead <= 0) {
            return {
                msg: "Actualización no realizada...",
                success: false,
            };
        }
        const head = await Headquarter.findOne({ where: { id } });
        return {
            msg: "Sede actualizada con exito...",
            head,
            success: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.updateHeadServ = updateHeadServ;
const deleteHeadServ = async (id) => {
    try {
        const findHead = await Headquarter.findOne({ where: { id } });
        if (findHead.dataValues.status) {
            return {
                msg: "La sede ya fue retirada",
            };
        }
        const deletedHeadquarter = await Headquarter.update({ status: true }, {
            where: {
                id,
            },
        });
        if (!deletedHeadquarter) {
            return {
                msg: "Sede no válida",
            };
        }
        return {
            msg: "Sede eliminada con exito...",
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.deleteHeadServ = deleteHeadServ;
