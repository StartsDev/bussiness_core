const Headquarter = require("../models/headquarter");
import { HeadquarterAttributes } from "../interfaces/headquarter.interface";

const createHeadServ = async (head: HeadquarterAttributes) => {
  try {
    const findHead = await Headquarter.findOne({
      where: { headName: head.headName },
    });
    if (findHead) {
      return {
        msg: "Esta sede ya existe",
      };
    }
    const newHead = await Headquarter.create(head);
    if (newHead === null) {
      return {
        msg: "Error al registrar la sede",
      };
    }
    return {
      msg: "Sede registrada satisfactoriamente...",
      data: newHead,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const getHeadServ = async () => {
  try {
    const headquarters = await Headquarter.findAll();
    return {
      data: headquarters,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateHeadServ = async (head: any) => {
  try {
    // verificar si todas la sedes si su propiedad is Principal esta en false
    // Recibir id del headquarter validar si existe en la tabla headquarters
    // Verificar si en la propiedad isPrincipal es true o false
    // Si es false actualizarlo a true
   // const headquarters = await Headquarter.update();
    return {
      //data: headquarters,
      msg:"Sede actualizada satisfactoriamente..."
    };
  } catch (e) {
    throw new Error(e as string);
  }
}

export { createHeadServ, getHeadServ, updateHeadServ };
