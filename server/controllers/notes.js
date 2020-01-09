const Note = require('../models/note');


Date.prototype.toShortFormat = function () {
    var currentDate = new Date();

    var month_names = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];

    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    var hours = this.getHours();
    var minutes = this.getMinutes();

    return "" + day + "th" + " of " + month_names[month_index] + ", " + year;
}


// Access all notes for the current signed in user

module.exports.get_all = (req, res, next) => {
    const userId = req.userData.userId;
    const folder = req.query.folder;

    var query =
        [
            { user_id: userId }
        ]

    if (folder) {
        query.push(
            { folder: folder }
        )
    }

    Note.find({
        $and: query
    })
        .then(docs => {
            if (docs.length > 0) {
                docs.sort()
                docs.reverse();
                const response = {
                    count: docs.length,
                    notes: docs.map(doc => {
                        return {
                            title: doc.title,
                            text: doc.text,
                            color: doc.color,
                            image: doc.image,
                            folder: doc.folder,
                            pinned: doc.pinned,
                            archived: doc.archived,
                            _id: doc._id,
                            date: doc.date
                        }
                    })
                }


                res.status(200).json({
                    response
                });
            } else {
                res.status(404).json({
                    error: "No entries found"
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Get a single note with it's ID

module.exports.getNote = (req, res, next) => {
    const userId = req.userData.userId;
    const noteId = req.params.noteId;

    Note.findOne({
        $and: [
            { _id: noteId },
            { user_id: userId }
        ]
    })
        .then(result => {
            if (result) {
                res.status(200).json({
                    result: {
                        title: result.title,
                        text: result.text,
                        color: result.color,
                        image: result.image,
                        _id: result._id,
                        folder: result.folder,
                        pinned: result.pinned,
                        date: result.date
                    }
                })
            } else {
                res.status(404).json({
                    error: "Note not found"
                })
            }
        })
        .catch(err => {
            console.log(err);
            if (err.name === "CastError") {
                res.status(404).json({
                    error: "Invalid ID"
                });
            } else {
                res.status(500).json({
                    err: err
                })
            }
        });
}

// Post a note
module.exports.post = (req, res, next) => {
    const userId = req.userData.userId;
    const currentDate = new Date().toShortFormat();

    const note = new Note({
        user_id: userId,
        date: currentDate,
        title: req.body.title,
        text: req.body.text,
        color: req.body.color,
        folder: req.body.folder,
        pinned: req.body.pinned
    }).save()
        .then(result => {
            res.status(201).json({
                message: "Note has been created successfully",
                note: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Edit a note
module.exports.patch = (req, res, next) => {
    const text = req.body.text;
    const title = req.body.title;
    const color = req.body.color;
    const folder = req.body.folder;
    const userId = req.userData.userId;
    const noteId = req.params.noteId;
    const pinned = req.body.pinned;
    const archived = req.body.archived;
    const currentDate = new Date().toShortFormat();

    var updatedValue = {
        date: currentDate
    };

    if (text) {
        updatedValue.text = text;
    };

    if (title) {
        updatedValue.title = title;
    };

    if (color) {
        updatedValue.color = color;
    }

    if (folder) {
        updatedValue.folder = folder;
    }

    if (pinned) {
        updatedValue.pinned = pinned
    };

    if (archived || archived === false) {
        
        if (archived === true) {
            updatedValue.pinned = false;
        } else if(archived) {
            updatedValue.pinned = pinned;
        };

        updatedValue.archived = archived;
    }
    
    Note.findOneAndUpdate({
        $and: [
            { _id: noteId },
            { user_id: userId }
        ]
    },
        updatedValue
        , { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json({
                    result
                })
            }
            else {
                res.status(404).json({
                    error: "This note does note exist"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


// Delete a note

module.exports.delete = (req, res, next) => {
    const userId = req.userData.userId;
    const noteId = req.params.noteId

    Note.findById(noteId)
        .then(result => {
            if (userId === result.user_id) {
                Note.findByIdAndRemove(noteId)
                    .then(() => {
                        res.status(200).json({
                            note_id: noteId,
                            deleted: true
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            } else {
                res.status(400).json({
                    error: "Something is wrong..."
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}
