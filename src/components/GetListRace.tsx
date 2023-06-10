import React, {useState} from "react"
import {
 Container, 
 Row, 
 Col, 
 Card, 
 Form,
 Button
} from "react-bootstrap"
import {ToastContainer, toast} from "react-toastify"
const GetListRace:React.FC = () => {
  const data = [
    {
      image:"https://media.formula1.com/content/dam/fom-website/teams/2023/alfa-romeo-racing.png.transform/4col/image.png",
      year:1993,
      driver:"Alessandro Alunni Bravi",
      team:"Alfa Romeo",
      race:"Great Britain"
   },
   {
      image:"https://media.formula1.com/content/dam/fom-website/teams/2023/ferrari.png.transform/4col/image.png",
      year:1950,
      driver:"Frédéric Vasseur",
      team:"Scuderia Ferrari",
      race:"Italian Grand Prix"
   },
   {
      image:"https://media.formula1.com/content/dam/fom-website/teams/2023-Team-Pages/teamcar-mercedes.png.transform/4col/image.png",
      year:1970,
      driver:"Clay Regazzoni",
      team:"Mercedes-AMG",
      race:"Italy"
   },
   {
      image:"https://media.formula1.com/content/dam/fom-website/teams/2023/alpine.png.transform/4col/image.png",
      year:1986,
      driver:"Otmar Szafnauer",
      team:"BWT Alpine",
      race:"United Kingdom"
   },
   {
      "image":"https://media.formula1.com/content/dam/fom-website/teams/2023-Team-Pages/teamcar-haas.png.transform/4col/image.png",
      "year":2016,
      "driver":"Guenther Steiner",
      "team":"MoneyGram Haas",
      "race":"United States"
   },
   {
      image:"https://media.formula1.com/content/dam/fom-website/teams/2023/williams.png.transform/4col/image.png",
      year:1978,
      driver:"James Vowles",
      team:"Williams Racing",
      race:"United Kingdom"
   }
  ]
  const [raceList, setRaceList] = useState<
   {image:string, year:number, driver:string, team:string, race:string}[] | undefined>(data)

  const [searchByYear, setSearchByYear] = useState("")
  const [searchByDriver, setSearchByDriver] = useState("")
  const [searchByTeam, setSearchByTeam] = useState("")
  const [searchByRace, setSearchByRace] = useState("")
  // Filter by year
  const onSearchByYear = () => {
    if(searchByYear === ""){
      toast.error("Please enter your search year", {position:"top-center"})
      return false
    }else{
      let searchYear = raceList && raceList?.length > 0 ? raceList?.filter((i) => i?.year === parseInt(searchByYear)): undefined;
      setRaceList(searchYear);
      return true
    }
  }
  // Filter by driver
  const onSearchByDriver = () => {
    if(searchByDriver === ""){
      toast.error("Please enter your search driver", {position:"top-center"})
      return false
    }else{
      let searchDriver = raceList && raceList?.length > 0 ? raceList?.filter((i) => i?.driver?.includes(searchByDriver)): undefined;
      setRaceList(searchDriver)
      return true
    }
  }
  // Filter by team
  const onSearchByTeam = () => {
    if(searchByTeam === ""){
      toast.error("Please enter your search team", {position:"top-center"})
      return false
    }else{
      let searchTeam = raceList && raceList?.length > 0 ? raceList?.filter((i) => i?.team?.includes(searchByTeam)): undefined;
      setRaceList(searchTeam)
      return true
    }
  }
  // Filter by race
  const onSearchByRace = () => {
    if(searchByRace === ""){
      toast.error("Please enter your search race", {position:"top-center"})
      return false
    }else{
      let searchRace = raceList && raceList?.length > 0 ? raceList?.filter((i) => i?.race?.includes(searchByRace)): undefined;
      setRaceList(searchRace)
      return true 
    }
  }
  // Reset list
  const resetList = () => {
   setRaceList(data)
  }
  return (
   <Container>
     <ToastContainer/>
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
        <Button className="mt-2" onClick={onSearchByYear}>Search year</Button>
        <Button 
          className="mt-2" 
          variant="success" 
          style={{marginLeft:"2%"}} 
          onClick={onSearchByDriver}
         >
          Search driver
       </Button>
       <Button 
         className="mt-2" 
         variant="secondary" 
         style={{marginLeft:"2%"}}
         onClick={onSearchByTeam}
       >
          Search team
        </Button>
       <div className="d-flex justify-content-center">
         <Button className="mt-2 w-50" variant="dark" onClick={onSearchByRace}>Search race</Button>
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
        {raceList && raceList?.length > 0 && raceList?.map((i, index) => {
          return(
           <Col lg="4" key={index} className="p-2">
             <Card className="p-1">
               <img src={i?.image} alt=""/>
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