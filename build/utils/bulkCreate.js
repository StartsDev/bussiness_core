"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreatefunction = void 0;
const bulkCreatefunction = async (model, data) => {
    try {
        const res = await model.bulkCreate(data);
        console.log(res);
        return res;
    }
    catch (error) {
        return {
            message: 'hubo un error en la creacion',
            success: false
        };
    }
};
exports.bulkCreatefunction = bulkCreatefunction;
