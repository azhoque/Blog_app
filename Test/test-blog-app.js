const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('/..server');
const should = chai.should;
chai.use(chaiHttp);

describe('BlogPosts', function(){
    before(function(){
        return runServer();
    });
    after(function(){
        return closeServer();
    });

    it('should list posts on GET', function(){
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res){
        res.should.have.staus(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.length.be.at.least(1);
        const expectedKeys = ['id', 'titile', 'author', 'content'];
        res.body.forEach(function(item){
            item.should.be.a('object');
            item.should.include.keys(expectedKeys);
        });
        });
    });

    it('should add posts on POST', function(){
        const newItem = {
            title: "blog 3",
            author: "Arya",
            content: "I am a dog and I love bones."
        };
        return chai.request(app)
        .post('/blog-posts')
        .send(newItem)
        .then(function(res){
            res.should.have.status(201);
            res.should.be.json;
            res.should.be.a('object');
            res.body.should.include.keys('id', 'title', 'author', 'content');
            res.body.id.should.not.be.null;
            res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
        });
    });

    it("should update item on PUT", function() {
        const updateData = {
          title: "blog 3",
          content: "I am a puppy and I love bully-sticks."
        };
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
          updateData.id = res.body[0].id;
    
          return chai.request(app)
            .put(`/blog-posts/${updateData.id}`)
            .send(updateData)
        })
        .then(function(res) {
          res.should.have.status(204);
        });
    });
    
      it("should delete items on DELETE", function() {
        return chai.request(app)
          .get("/blog-posts")
          .then(function(res) {
            return chai.request(app).delete(`/blog-posts/${res.body[0].id}`);
          })
          .then(function(res) {
            res.should.have.status(204);
          });
      });


































});