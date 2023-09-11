const Sequelize = require("sequelize");

export const maintFilterOptions = (params: any) => {
  let optionsm = {};
  let optionse = {};
  let optionsl = {};
  let optionsh = {};
  let optionsc = {};

  const {
    status,
    businessName,
    nit,
    techName,
    address,
    email,
    city,
    contact,
    headName,
    addressh,
    emailh,
    locationName,
    name,
    serial,
    model,
    type,
    brand,
  } = params;

  // Maintenance
  if (status) {
    optionsm = {
      status: { [Sequelize.Op.iLike]: `${status}%` },
      delete: false,
    };
  }
  if (techName) {
    optionsm = {
      "tech.techName": { [Sequelize.Op.iLike]: `${techName}%` },
      delete: false,
    };
  }

  // Equipment
  if (name) {
    optionse = {
      name: { [Sequelize.Op.iLike]: `${name}%` },
      delete: false,
    };
  }
  if (serial) {
    optionse = {
      serial: { [Sequelize.Op.iLike]: `${serial}%` },
      delete: false,
    };
  }
  if (model) {
    optionse = {
      model: { [Sequelize.Op.iLike]: `${model}%` },
      delete: false,
    };
  }
  if (type) {
    optionse = {
      type: { [Sequelize.Op.iLike]: `${type}%` },
      delete: false,
    };
  }
  if (brand) {
    optionse = {
      brand: { [Sequelize.Op.iLike]: `${brand}%` },
      delete: false,
    };
  }

  // Location
  if (locationName) {
    optionsl = {
      locationName: { [Sequelize.Op.iLike]: `${locationName}%` },
      delete: false,
    };
  }

  //Headquarter
  if (headName) {
    optionsh = {
      headName: { [Sequelize.Op.iLike]: `${headName}%` },
      delete: false,
    };
  }
  if (addressh) {
    optionsh = {
      address: { [Sequelize.Op.iLike]: `${addressh}%` },
      delete: false,
    };
  }
  if (emailh) {
    optionsh = {
      email: { [Sequelize.Op.iLike]: `${emailh}%` },
      delete: false,
    };
  }

  //Client
  if (businessName) {
    optionsc = {
      businessName: { [Sequelize.Op.iLike]: `${businessName}%` },
      delete: false,
    };
  }
  if (nit) {
    optionsc = {
      nit: { [Sequelize.Op.iLike]: `${nit}%` },
      delete: false,
    };
  }
  if (address) {
    optionsc = {
      address: { [Sequelize.Op.iLike]: `${address}%` },
      delete: false,
    };
  }
  if (email) {
    optionsc = {
      email: { [Sequelize.Op.iLike]: `${email}%` },
      delete: false,
    };
  }
  if (city) {
    optionsc = {
      city: { [Sequelize.Op.iLike]: `${city}%` },
      delete: false,
    };
  }
  if (contact) {
    optionsc = {
      contact: { [Sequelize.Op.iLike]: `${contact}%` },
      delete: false,
    };
  }
  if (
    !status &&
    !businessName &&
    !nit &&
    !techName &&
    !address &&
    !email &&
    !city &&
    !contact &&
    !headName &&
    !addressh &&
    !emailh &&
    !locationName &&
    !name &&
    !serial &&
    !model &&
    !type &&
    !brand 
  ) {
    optionsm = { delete: false };
  }

  return { optionsm, optionsh, optionsl, optionse, optionsc };
};
