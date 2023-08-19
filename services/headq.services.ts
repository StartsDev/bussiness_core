const Headquarter = require("../models/headquarter");
const Client = require("../models/client");

const createHeadServ = async (head: any) => {
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
  } catch (e) {
    throw new Error(e as string);
  }
};

const getHeadServ = async (page?: number, pageSize?: number) => {
  try {
    let headquarters;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      headquarters = await Headquarter.findAll({
        offset,
        limit: pageSize,
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Client,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          },
        ],
      });
      const totalCount = await Headquarter.count({ where: { status: false } });
      return {
        headquarters,
        totalCount,
        success: true,
      };
    } else {
      headquarters = await Headquarter.findAll({
        where: { status: false },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Client,
            attributes: { exclude: ["id", "createdAt", "updatedAt", "status"] },
          },
        ],
      });
      const totalCount = await Headquarter.count({ where: { status: false } });
      return {
        headquarters,
        totalCount,
        success: true,
      };
    }
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

const allHeadClientServ = async (
  user: any,
  page?: number,
  pageSize?: number
) => {
  try {
    let hedClient;
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      hedClient = await Headquarter.findAll({
        offset,
        limit: pageSize,
        where: { clientId: user },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
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
          success: false,
        };
      }
      const totalCount = await Headquarter.count();

      return {
        hedClient,
        totalCount,
        success: true,
      };
    } else {
      hedClient = await Headquarter.findAll({
        where: { clientId: user },
        attributes: { exclude: ["updatedAt"] },
        order: [["createdAt", "DESC"]],
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
          success: false,
        };
      }
      const totalCount = await Headquarter.count();

      return {
        hedClient,
        totalCount,
        success: true,
      };
    }
  } catch (e) {
    throw new Error(e as string);
  }
};

const updateHeadServ = async (id: any, headq: any) => {
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
      success: true,
    };
  } catch (e) {
    throw new Error(e as string);
  }
};

const deleteHeadServ = async (id: any) => {
  try {
    const findHead = await Headquarter.findOne({ where: { id } });
    if (findHead.dataValues.status) {
      return {
        msg: "La sede ya fue retirada",
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
