import model from "../models/AnswerChoices.js";
import utils from "./utils.js"

export default {
    index: function(req, res) {
        model.getAll(res);
    },

    getOne: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        model.getById(req.params.id, res);
    },

    store: function(req, res) {
        const dataComplete = (
            req.body["question_ID"] != undefined
            && req.body["text"] != undefined
            && req.body["isCorrect"] != undefined
        )

        const dataTypeCorrect = (
            !isNaN(req.body["question_ID"])
            && (!isNaN(req.body["isCorrect"]) && (
                    Number(req.body["isCorrect"]) < 2 
                    && Number(req.body["isCorrect"]) > -1
                    )
                )
        )

        if( !(dataComplete && dataTypeCorrect) ) {
            const errorMsg = [];
            if(!dataComplete) {
                errorMsg.push("'question_ID', 'text', and 'isCorrect' was not all provided");
            } 

            if(!dataTypeCorrect) {
                errorMsg.push("'question_ID' and should be a number and 'isCorrect` should be either 0 or 1");
            }

            res.status(400);
            res.send({msg: errorMsg});
            return;
        }

        const data = [
            ["question_ID", "text", "isCorrect"],
            [req.body["question_ID"], req.body["text"], req.body["isCorrect"]]
        ]
        model.store(data, res);
    },

    edit: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), ["isCorrect", "text"], res)) return;

        // Ignore when doesn't exist
        const isCorrectTypeCorrect = (req.body["isCorrect"] == undefined 
                            || (!isNaN(req.body["isCorrect"]) && (
                                        Number(req.body["isCorrect"]) < 2 
                                        && Number(req.body["isCorrect"]) > -1
                                    )
                                )
        );
        if( !isCorrectTypeCorrect ) {
            res.status(400);
            res.send({msg: "'isCorrect' should be either 0 or 1"});
            return;
        }

        model.edit(req.params.id, req.body, res);
    },

    destroy: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        model.destroy(req.params.id, res);
    }
}