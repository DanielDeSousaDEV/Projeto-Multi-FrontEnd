import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { Pie } from 'react-chartjs-2'
import { ChartData, ArcElement, PieController, ChartOptions } from 'chart.js'
import { Chart } from 'chart.js/auto'


interface PatientsDashboardProps {
    data:Patient[]
}

export function PatientsDashboard({data}:PatientsDashboardProps) {
        var EstadosPerc:Array<number> = []

        let PossiveisEstados = [
            'Sintomas Insuficientes',
            'Potencial Infectado',
            'Possível Infectado',
            'Indefinido'
        ]
        
        
        PossiveisEstados.map((Estado)=>{
            EstadosPerc.push(
                data.filter((Paciente)=>{
                    return Paciente.condition === Estado
                }).length/data.length
            )
        })

        EstadosPerc.map((EstadoPerc,index)=>{
            EstadosPerc[index] = Math.round(EstadoPerc * 100)
        }) 

        if (EstadosPerc.includes(NaN)) {
            EstadosPerc.fill(0)
        }

        console.log(EstadosPerc)

        
        let PieChartData:ChartData<'pie', number[], unknown> = {
            labels:PossiveisEstados,
            datasets:[
                {
                    label: '',
                    data: EstadosPerc,
                    
                }
            ]
        }    

        let PieChartOptions:ChartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Porcentagem dos pacientes por estados',
                    color:'white',
                    position: 'top',
                    fullSize: true

                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let value = Number(context.raw) || 0;
                            return `${(value)}%`;
                        },
                    },
                }
            },
        }

        Chart.register(ArcElement, PieController)


    return(
        <Row className="rounded justify-content-center py-2 mb-3" style={{backgroundColor:"var(--tertiary)"}}>
            
            <Container>
                <h3 className="fw-bold">Dashboard</h3>
            </Container>

            <hr />

            <Row className="text-start justify-content-center w-100 p-0 gap-1">
                <Row className="gap-1">
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Sintomas Insuficientes:</b><br />
                        <span>{EstadosPerc[0]}%</span>
                    </Col>
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Potencial Infectado:</b><br />
                        <span>{EstadosPerc[1]}%</span>
                    </Col>
                </Row>
                <Row className="gap-1">
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Possível Infectado:</b><br />
                        <span>{EstadosPerc[2]}%</span>
                    </Col>
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Indeterminados:</b><br />
                        <span>{EstadosPerc[3]}%</span>
                    </Col>
                </Row>
                <div className="gap-1 d-flex" style={{width: '100%', textAlign: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <Pie style={{margin: 'auto'}} data={PieChartData} options={PieChartOptions}/>
                </div>
            </Row>

        </Row>
    )
}
