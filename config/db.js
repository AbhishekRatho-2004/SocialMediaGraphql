const mongoose = require("mongoose")

URI = process.env.URI

module.exports = mongoose.connect(URI)
                            .then(()=>console.log("DB connected successfully"))
                            .catch(err=>console.log(err))

