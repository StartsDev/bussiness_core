const Maintenance = require("../models/maintenance");


const uploadImage = async(image:string, id:string)=>{
    try {
        let idParsed = parseInt(id)
       const findMaintenance = await Maintenance.findOne({
        where:{id:id}
       })
       if(!findMaintenance){
        return{
            msg:"Servicio no encontrado",
            success:false
        }
       }
       const photoArray = findMaintenance.dataValues.photos
       photoArray.push(image);
       const updateMaintenance = await Maintenance.update({photos:photoArray},{
        where:{id:idParsed}
       })
       if (updateMaintenance <= 0) {
        return {
          msg: "Actualización no realizada...",
          success: false,
        };
      }
      const maintenance = await Maintenance.findOne({ where: { id } });
       return{
        msg:"Servicio actualizado",
        maintenance,
        success:true
    }
      } catch (e) {
        throw new Error(e as string);
      }
}

export {
    uploadImage,
}