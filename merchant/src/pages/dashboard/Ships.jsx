import CRUDTable from '../../components/CRUDTable'

const columns = [
  { key: 'ship_id', label: 'ID' },
  { key: 'ship_name', label: 'Name' },
  { key: 'ship_type', label: 'Type' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'built_year', label: 'Built Year' }
]

export default function Ships(){
  return (
    <div className="page-root ships-page">
      <h2>Ships</h2>
      <p className="muted">Manage ships — add or remove vessels.</p>
      <CRUDTable path="ships" columns={columns} idKey="ship_id" />
    </div>
  )
}
