const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../backend/app");

chai.should();
chai.use(chaiHttp);

describe("Submodel Controller", () => {
    it("Find all Submodels", (done) => {
        chai.request(server)
            .get("/api/subModel")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(3);
                done();
            });
    });

    it("Find specific Submodel by id", (done) => {
        const subModelId = "61ab8fe74ff9328763f66f2a";
        chai.request(server)
            .get(`/api/subModel/${subModelId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.name.should.be.eql("Premium");
                done();
            });
    });

    it("Find specific Submodel by id that does not exist", (done) => {
        const subModelId = "72ab905d8b0713a7c872c3dd";
        chai.request(server)
            .get(`/api/subModel/${subModelId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    after (async () => {
        server.stop();
    });
    
});
