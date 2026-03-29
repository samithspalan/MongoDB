import CRUDTable from '../../components/CRUDTable'

const columns = [
  { key: 'crew_id', label: 'ID' },
  { key: 'crew_name', label: 'Name' },
  { key: 'rank', label: 'Rank' },
  { key: 'joining_date', label: 'Joining Date' },
  { key: 'ship_id', label: 'Ship ID' }
]

export default function Crew(){
  return (
    <div className="page-root crew-page">
      <h2>Crew</h2>
      <p className="muted">Manage crew members and assignments.</p>
      <CRUDTable path="crew" columns={columns} />
    </div>
  )
}
