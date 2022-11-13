/* eslint-disable no-unused-vars, no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/server.js'
const should = chai.should()

chai.use(chaiHttp)

describe('GET /', () => {
  it('Returns 404', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        if (err) done(err)

        res.should.have.status(404)
        res.body.should.be.a('object').that.have.property('error')
        res.body.error.should.be.eq('Path not found!')

        done()
      })
  })
})

describe('GET /api/files/data', () => {
  it('Can list the files', done => {
    chai
      .request(server)
      .get('/api/files/data')
      .end((err, res) => {
        const { body: files } = res
        if (err) done(err)

        res.should.have.status(200)
        files.should.be.a('array').that.have.lengthOf.above(0)

        done()
      })
  })

  it('Each file has the expected schema', done => {
    chai
      .request(server)
      .get('/api/files/data')
      .end((err, res) => {
        const { body: files } = res
        if (err) done(err)

        res.should.have.status(200)

        // iterate the files
        files.forEach(file => {
          file.should.be.a('object').that.has.all.keys('file', 'lines')
          file.lines.should.be.a('array').that.have.lengthOf.above(0)

          file.lines.forEach(line => {
            line.should.be.a('object').that.has.all.keys('text', 'hex', 'number')

            line.text.should.be.a('string')
            line.number.should.be.a('number')
            line.hex.should.be.a('string').that.have.lengthOf(32)
          })
        })

        done()
      })
  })

  it('Can filter by fileName', done => {
    const filterQuery = 'test9.csv'
    chai
      .request(server)
      .get(`/api/files/data?fileName=${filterQuery}`)
      .end((err, res) => {
        const { body: files } = res
        if (err) done(err)

        res.should.have.status(200)
        files.should.be.a('array').that.have.lengthOf(1)
        files[0].should.be.a('object').that.has.all.keys('file', 'lines')
        files[0].file.should.be.a('string').that.has.string(filterQuery)

        done()
      })
  })
})
