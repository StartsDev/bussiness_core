const Headquarter = require("../models/headquarter");
import { HeadquarterAttributes } from "../interfaces/headquarter.interface";
const Client = require("../models/client");

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
    const headquarters = await Headquarter.findAll({
      where: { status: false },
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
  } catch (e) {
    throw new Error(e as string);
  }
};

const getOneHeadServ = async (head: any) => {
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
  } catch (e) {
    throw new Error(e as string);
  }
};

const allHeadClientServ = async (user: any) => {
  try {
    const hedClient = await Headquarter.findAll({
      where: { clientId: user },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Client,
          attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
        }
      ],
    });
    if (!hedClient) {
      return {
        msg: "Sedes no hay con este cliente",
        users: [],
      };
    }
    return { data: hedClient };
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateHeadServ = async (id: any, head: any) => {
  try {
    const [updateHead] = await Headquarter.update(head, {
      where: {
        id,
      },
      returning: true,
    });
    if (!updateHead) {
      return {
        msg: "Sede no válida",
      };
    }
    return {
      msg: "Sede actualizada con exito...",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const deleteHeadServ = async (id: any) => {
  try {
    const findHead = await Headquarter.findOne({ where: { id } });
    if (findHead.status) {
      return {
        msg: "Sede no válida",
      };
    }
    const deletedHeadquarter = await Headquarter.update(
      { status: true },
      {
        where: {
          id,
        },
      }
    );
    if (!deletedHeadquarter) {
      return {
        msg: "Sede no válida",
      };
    }
    return {
      msg: "Sede eliminada con exito...",
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

export {
  createHeadServ,
  getHeadServ,
  updateHeadServ,
  getOneHeadServ,
  allHeadClientServ,
  deleteHeadServ,
};
