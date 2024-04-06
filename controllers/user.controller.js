import bcrypt from "bcrypt";
import model from "../models/Users.js";
import utils from "./utils.js"

const FILLABLES = ["name", "username", "password"];

export default {
    index: async function(req, res, next) {
        await model.getAll()
            .then((result) => {
                return res.send({
                    msg: "User data fetch success",
                    data: result
                });
            })
            .catch(err => { next({code: "query_error", reason: err}); });
    },

    getOne: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.getById(req.params.id)
            .then((result) => {
                return res.send({
                    msg: "User data fetch success",
                    data: result,
                });
            })
            .catch(err => { next({code: "query_error", reason: err}); });
    },

    store: function(req, res, next) {
        const dataComplete = FILLABLES.every(key => req.body[key] != undefined)
        if(!dataComplete) {
            return res.status(400).send({ msg: "No required data was given" })
        }

        bcrypt.hash(req.body["password"], 10, async function(err, hash) {
            if(err) { return res.status(500).send({ msg: err }) }

            req.body["password"] = hash;
            await model.store(FILLABLES.map(key => req.body[key]))
            .then(result => res.send({ msg: `ser created with id ${result}`}))
            .catch(err => { next({code: "query_error", reason: err}); });
        })
    },

    edit: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), FILLABLES, res)) return;

        const hasChangeData = FILLABLES.some(key => req.body[key] != undefined)
        if(!hasChangeData) {
            return res.status(400).send({ msg: "No change data was given" })
        }

        await model.edit(req.params.id, req.body)
            .then(result => res.send({msg: result}))
            .catch(err => { next({ code: "query_error", reason: err }); });
    },

    destroy: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.destroy(req.params.id)
            .then(result => res.send({msg: result}))
            .catch(err => { next({ code: "query_error", reason: err }); });
    }
}