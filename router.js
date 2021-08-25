const router = require("express").Router();
const X_KEY = process.env.ADMIN_KEY;
const  DB = require("./model");

router.post("/:visId", async (req, res) => {
    const visId = req.params.visId;
    const vis = await DB.findOne({microfrontendName: visId});
    const { name, config } = req.body;

    if (!config || !name){
        return res.status(400).send({error: "Not found parameters"});
    }

    if (!vis) {
        try {
            const newVis = new DB({ microfrontendName: visId, configurations: [{name: name, config: config}]});
            await newVis.save();
            return res.status(201).json({name: name})
        }
        catch (err) {
            console.log(err);
            return res.status(400).send({error: "bad microfrontend name"});
        }
    }
    
    if (vis.configurations.filter(config => config.name === name).length !== 0) {
        return res.status(400).send({error: "duplicate configuration name"});
    }
    vis.configurations.push({name: name, config: config});
    await vis.save();
    res.status(201).json({name: name});
});

router.get("/:visId/", async (req, res) => {
    const { visId } = req.params;
    const configName = req.get("config-name");
    
    const vis = await DB.findOne({microfrontendName: visId});
    if (!configName) {
        return !vis ? res.status(200).json([]) : res.status(200).json(vis.configurations.map(doc => doc.name));
    }
    const configurations = vis.configurations;
    const config = configurations.filter(configuration => configuration.name === configName);
    if (config.length === 0){
        return res.status(404).send({error: "config not found with name"});
    }
    return res.status(200).json(config[0])
})



router.delete("/:visId", async (req, res) => {
    const { visId } = req.params;
    const x_key = req.get("x-api-key");
    const configName = req.get("config-name");
    if (x_key !== X_KEY){
        return res.status(400).send({error: "No access right"});
    }

    const vis = await DB.findOne({microfrontendName: visId});
    
    if (!vis){
        return res.status(400).send({error: "bad microfrontend name"});
    }

    vis.configurations = vis.configurations.filter(config => config.name !== configName);
    await vis.save();
    res.status(200).json({name: configName});
})

router.delete("/all/:visId", async (req, res) => {
    const x_key = req.get("x-api-key");
    
    if (x_key !== X_KEY){
        return res.status(400).send({error: "No access right"});
    }
    const visId = req.params.visId;
    await DB.findOneAndDelete({microfrontendName: visId});
    return res.status(200).json({microfrontend: visId});
})

module.exports = router;