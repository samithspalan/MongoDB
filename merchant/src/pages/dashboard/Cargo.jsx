import CRUDTable from '../../components/CRUDTable'

const columns = [
  { key: 'cargo_id', label: 'ID' },
  { key: 'cargo_type', label: 'Type' },
  { key: 'weight', label: 'Weight' },
  { key: 'voyage_id', label: 'Voyage ID' }
]

export default function Cargo(){
  return (
    <div className="page-root cargo-page">
      <h2>Cargo</h2>
      <p className="muted">Manage cargo items and link to voyages.</p>
      <CRUDTable path="cargo" columns={columns} />
    </div>
  )
}
