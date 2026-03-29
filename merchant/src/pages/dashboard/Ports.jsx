import CRUDTable from '../../components/CRUDTable'

const columns = [
  { key: 'port_id', label: 'ID' },
  { key: 'port_name', label: 'Port' },
  { key: 'country', label: 'Country' }
]

export default function Ports(){
  return (
    <div className="page-root ports-page">
      <h2>Ports</h2>
      <p className="muted">Manage ports and their countries.</p>
      <CRUDTable path="ports" columns={columns} />
    </div>
  )
}
