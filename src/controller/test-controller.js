

const testApp = async (req, res) => {
    return res.status(200).send("Node Server is up and running");
}

module.exports = { testApp }