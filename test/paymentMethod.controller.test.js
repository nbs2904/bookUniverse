const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const server = require("../backend/app");

chai.use(chaiHttp);

describe("Payment Method Controller", () => {

    it("Find all payment Methods", (done) => {
        chai.request(server)
            .get("/api/paymentMethod")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(3);
                done();
            });
    });

    it("Find specific payment Method by id", (done) => {
        const paymentMethodId = "61ab905d8b0713a7c872c3de";
        chai.request(server)
            .get(`/api/paymentMethod/${paymentMethodId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.name.should.be.eql("Paypal");
                done();
            });
    });

    it("Find specific payment Method by id that does not exist", (done) => {
        const paymentMethodId = "72ab905d8b0713a7c872c3dd";
        chai.request(server)
            .get(`/api/paymentMethod/${paymentMethodId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    

    after (async () => {
        server.stop();
    });
    
});
