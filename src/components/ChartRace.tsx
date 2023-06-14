import {Bar} from "react-chartjs-2"
import data from "../db/db.json"
import {
 CategoryScale, 
 Chart,
 LinearScale,
 PointElement,
 LineElement,
 BarElement
} from "chart.js"
import {Button, Form} from "react-bootstrap"
import {useState} from "react"
Chart.register(
 CategoryScale, 
 LinearScale, 
 PointElement,
 LineElement,
 BarElement
)

interface chartData{
  image:string,
  year:number,
  driver:string,
  team:string,
  race:string
}
const ChartRace:React.FC = () => {
  const [list, setList] = useState<chartData [] | undefined>(data)
  const [sort, setSort] = useState(0)
  const onsortAscending = () => {
    if(sort === 0){
      setSort(1)
      let sortInDescending = data?.sort((a, b) => b?.year - a?.year)
      setList(sortInDescending);
    }else{
      setSort(0)
      let sortInAscending = data?.sort((a,b) => a?.year - b?.year)
      setList(sortInAscending)
    }
  }
  const resetChartList = () => {
    setList(data)
  }
  return(
   <div>
     <h2 className="text-center text-primary">Chart Race results</h2>
     <div className="d-flex justify-content-end p-2">
       <Form.Select className="w-25 rm-border" onChange={onsortAscending}>
         <option value={0}>Sort ascending</option>
         <option value={1}>Sort descending</option>
       </Form.Select>
       <Button 
         style={{marginLeft:"0.5%"}} 
         className="btn-success"
         onClick={resetChartList}
        >
          Remove filter
        </Button>
     </div>
     <Bar
       data={{
        labels:list?.map((i) => i?.year),
        datasets:[
         {
           data:[1,2,3,4,5,6],
           backgroundColor:[
             "blue",
             "green",
             "purple"
           ],
           barPercentage:0.3
         }
        ] 
       }}
     />
   </div>
  )
}
export default ChartRace