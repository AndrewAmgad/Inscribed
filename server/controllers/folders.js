const Note = require('../models/note');

module.exports.getFolders = (req, res, next) => {

    const userId = req.userData.userId;
    var folders = [];

    Note.find({ user_id: userId })
        .then(docs => {

            if (docs.length > 0) {
                // Check the value of each note's folder property
                docs.map(doc => {
                    if(doc.archived !== true){
                        folders.push(doc.folder);
                    }
                });

                // Filter reptitive and null folder values

                const filteredFolders = [...new Set(folders)].filter((el) => {
                    if(el !== null && el !== "none"){
                        return el
                    }
                });

                const response = {
                    count: filteredFolders.length,
                    folders: filteredFolders
                }

                res.status(200).json({
                    response
                });

            } else {
                res.status(404).json({
                    error: "No folders found"
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};