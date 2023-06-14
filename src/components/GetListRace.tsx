import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap"
import {ToastContainer, toast} from "react-toastify"
import data from "../db/db.json"
interface listData {
  image: string,
  year: number,
  driver: string,
  team: string,
  race: string
}
const GetListRace: React.FC = () => {
  const [raceList, setRaceList] = useState<listData[] | undefined>(data)
  const [searchByYear, setSearchByYear] = useState("")
  const [searchByDriver, setSearchByDriver] = useState("")
  const [searchByTeam, setSearchByTeam] = useState("")
  const [searchByRace, setSearchByRace] = useState("")
  const [sort, setSort] = useState(0)
  const [up, setUp] = useState(false)
  console.log("up", up)
  // Filter all
  const onSearchAll = () => {
    if (searchByYear === "") {
      toast.error("Please enter your search year", { position: "top-center" })
      return false
    }
    if (searchByDriver === "") {
      toast.error("Please enter your search driver", { position: "top-center" })
      return false
    }
    if (searchByTeam === "") {
      toast.error("Please enter your search team", { position: "top-center" })
      return false
    }
    if (searchByRace === "") {
      toast.error("Please enter your search race", { position: "top-center" })
      return false
    } else {
      let filterByYear = raceList?.filter((i) => i.year === parseInt(searchByYear))
      let filterByDriver = raceList?.filter((i) => i.driver.includes(searchByDriver))
      let filterByTeam = raceList?.filter((i) => i.team.includes(searchByTeam))
      let filterByRace = raceList?.filter((i) => i.race.includes(searchByRace))
      let filterAll = filterByYear || filterByDriver || filterByTeam || filterByRace
      setRaceList(filterAll)
      return true
    }
  }
  // Sort year
  const sortByYear = () => {
    if (sort === 0) {
      setSort(1)
      let sortByYearInAsc = data?.sort((a, b) => a?.year - b?.year)
      setUp(true)
      setRaceList(sortByYearInAsc)
    } else {
      setSort(0)
      setUp(false)
      let sortByYearInDesc = data?.sort((a, b) => b?.year - a?.year)
      setRaceList(sortByYearInDesc)
    }
  }
  // Reset list
  const resetList = () => {
    setRaceList(data)
  }
  return (
    <Container>
      <ToastContainer />
      <Form className="form-border mt-1">
        <Form.Label>Year:</Form.Label>
        <Form.Control
          className="rm-border"
          value={searchByYear}
          onChange={(e) => setSearchByYear(e?.target?.value)}
        />
        <Form.Label className="mt-2">Driver:</Form.Label>
        <Form.Control
          className="rm-border"
          value={searchByDriver}
          onChange={(e) => setSearchByDriver(e?.target?.value)}
        />
        <Form.Label className="mt-2">
          Team:
        </Form.Label>
        <Form.Control
          className="rm-border"
          value={searchByTeam}
          onChange={(e) => setSearchByTeam(e?.target?.value)}
        />
        <Form.Label className="mt-2">Race:</Form.Label>
        <Form.Control
          className="rm-border"
          value={searchByRace}
          onChange={(e) => setSearchByRace(e?.target?.value)}
        />
        <div className="d-flex justify-content-center">
          <Button className="mt-2" onClick={onSearchAll}>Search all</Button>
          <Button
            className="mt-2 text-white"
            variant="info"
            style={{marginLeft:"2%"}}
            onClick={resetList}
          >
            Reset race list
          </Button>
        </div>
      </Form>
      <Row className="p-2">
        <>
          <div className="d-flex justify-content-end">
            <p className="text-primary">Show {raceList?.length} results</p>
          </div>
          <div className="d-flex justify-content-end">
            <Button onClick={sortByYear} variant="dark" className="text-white">
              {
                up ? 
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                   <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                 </svg>
                 :  
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                </svg>}
            </Button>
          </div>
          {raceList && raceList?.length > 0 && raceList?.map((i, index) => {
            return (
              <Col lg="4" key={index} className="p-2">
                <Card className="p-1">
                  <img src={i?.image} alt="" />
                  <h2 className="text-center">{i?.driver}</h2>
                  <span className="text-secondary text-center font-weight-bold">{i?.team}</span>
                  <p className="text-center text-info">{i?.race}</p>
                  <p className="text-center text-warning">{i?.year}</p>
                </Card>
              </Col>
            )
          })
          }
        </>
      </Row>
    </Container>
  )
}

export default GetListRace