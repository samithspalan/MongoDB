import CRUDTable from '../../components/CRUDTable'

const columns = [
  { key: 'voyage_id', label: 'ID' },
  { key: 'voyage_name', label: 'Voyage' },
  { key: 'ship_id', label: 'Ship ID' },
  { key: 'departure_port', label: 'Departure' },
  { key: 'arrival_port', label: 'Arrival' },
  { key: 'departure_date', label: 'Dep. Date' },
  { key: 'arrival_date', label: 'Arr. Date' }
]

export default function Voyages(){
  return (
    <div className="page-root voyages-page">
      <h2>Voyages</h2>
      <p className="muted">Create and manage voyages.</p>
      <CRUDTable path="voyages" columns={columns} />
    </div>
  )
}
