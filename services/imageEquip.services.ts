const Equipment= require("../models/equipment");


const uploadImageServ = async(image:string, id:string)=>{
    try {
       const findEquipment = await Equipment.findOne({
        where:{id:id}
       })
       if(!findEquipment){
        return{
            msg:"Equipo no encontrado",
            success:false
        }
       }
       const updateEquipment = await Equipment.update({image},{
        where:{id}
       })
       if (updateEquipment <= 0) {
        return {
          msg: "Actualización no realizada...",
          success: false,
        };
      }
      const equipment = await Equipment.findOne({ where: { id } });
       return{
        msg:"Equipo actualizado",
        equipment,
        success:true
    }
      } catch (e) {
        throw new Error(e as string);
      }
}

export {
    uploadImageServ,
}