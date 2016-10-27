'use strict';

module.exports = function (Owner) {


  Owner.observe('after save', function (ctx, next) {

    console.log("Komunikat po zapisie. Obserwator.", ctx.instance.ownerName);
    next();
  });
};
