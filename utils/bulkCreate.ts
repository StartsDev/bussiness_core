export const bulkCreatefunction = async (model: any, data: Array<{}>) => {
  try {
    const res = await model.bulkCreate(data)
    console.log(res);
    return res
  } catch (error) {
    return {
      message: 'hubo un error en la creacion',
      success: false
    }
  }
}