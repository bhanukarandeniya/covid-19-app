const faker = require('faker')
const { DB } = require('../../config/config')
const { CovidIncident, Person, District } = require('../model')

const maxCovidIncidentRecords = DB.max_covid_incident_records
const maxPersonRecords = DB.max_person_records
const dates = getSortedDates()
const incidentDescriptions = getIncidentDescriptions()
const personDescriptions = getPersonDescriptions()

const fetchData = async () => {
  fetchDistricts()
  fetchCovidIncidents()
}

async function fetchDistricts () {
  const data = await District.findAll({
    limit: 1
  })
  if (data.length <= 0) {
    console.log('Generating and fetching data to the database...')
    for (let i = 0; i < getDistricts().length; i++) {
      const district = await getDistrict(i)
      await District.create(district)
    }
  }
}

async function fetchCovidIncidents () {
  const data = await CovidIncident.findAll({
    limit: 1,
    where: { active_record: true }
  })
  if (data.length <= 0) {
    console.log('Generating and fetching data to the database...')
    for (let i = 0; i < maxCovidIncidentRecords; i++) {
      const covidIncident = await getCovidIncidentData(i)
      const incident = await CovidIncident.create(covidIncident)
      const count = findIndex(Math.round((maxPersonRecords / 2)), maxPersonRecords)
      for (let y = 0; y < count; y++) {
        const person = await getPersonData(incident.dataValues.id)
        await Person.create(person)
      }
    }
  }
}

async function getDistrict (index) {
  const district = {}
  district.name = getDistricts()[index]
  district.code = faker.fake('{{address.zipCode}}')
  return district
}

async function getPersonData (covidIncidentId) {
  const person = {}
  person.firstname = faker.fake('{{name.firstName}}')
  person.lastname = faker.fake('{{name.lastName}}')
  person.address1 = faker.fake('{{address.streetName}}')
  person.address2 = faker.fake('{{address.streetAddress}}')
  person.nic = faker.fake('{{finance.routingNumber}}') + 'V'
  person.city = faker.fake('{{address.city}}')
  person.dob = faker.date.between('1960-01-01', new Date()).toDateString()
  person.maritial_status = Math.random() < 0.5
  person.spouse = faker.fake('{{name.findName}}')
  person.occupation = faker.fake('{{name.title}}')
  person.infection_status = getInfectionStatus()
  const index = findIndex(0, personDescriptions.length)
  person.description = personDescriptions[index]
  person.gender = Math.random() < 0.5
  person.contact_no = faker.fake('{{phone.phoneNumber}}')
  person.incident_id = covidIncidentId
  person.person_district = findIndex(1, (getDistricts().length + 1))
  return person
}

async function getCovidIncidentData (dateIndex) {
  const covidIncident = {}
  covidIncident.date = dates[dateIndex].toDateString()
  covidIncident.location = faker.fake('{{address.nearbyGPSCoordinate}}')
  const city = faker.fake('{{address.city}}')
  covidIncident.address = (faker.fake('{{address.streetName}}, {{address.streetAddress}}') + ' ,' + city)
  covidIncident.city = city
  const index = findIndex(0, incidentDescriptions.length)
  covidIncident.description = incidentDescriptions[index]
  covidIncident.covid_district = findIndex(1, (getDistricts().length + 1))
  return covidIncident
}

function getSortedDates () {
  const dates = []
  for (let i = 0; i < maxCovidIncidentRecords; i++) {
    dates.push(faker.date.between('2020-03-01', new Date()))
  }
  const sortedDates = dates.sort(function (a, b) {
    return new Date(a) - new Date(b)
  })
  return sortedDates
}

function getPersonDescriptions () {
  const des = ['Person was direct associate of a patient', 'Person was indirect associate of a patient',
    'Person has come from abroad']
  return des
}

function getIncidentDescriptions () {
  const des = ['Incident was reported at a hospital', 'Incident was reported to emergency unit by hotline',
    'Incident was reported by PHI', 'Incident was reported by Police']
  return des
}
function findIndex (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getInfectionStatus () {
  const values = ['POSITIVE', 'NEGATIVE', 'PENDING']
  const index = findIndex(0, values.length)
  return values[index]
}

function getDistricts () {
  const districts = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya', 'Puttalam', 'Kurunegala', 'Gampaha', 'Colombo', 'Kalutara',
    'Anuradhapura', 'Polonnaruwa', 'Matale', 'Kandy', 'Nuwara Eliya', 'Kegalle', 'Ratnapura', 'Trincomalee', 'Batticaloa', 'Ampara', 'Badulla',
    'Monaragala', 'Hambantota', 'Matara', 'Galle']
  return districts
}

module.exports = { fetchData }
