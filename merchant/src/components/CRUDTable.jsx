import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function CRUDTable({ path, columns, idKey: propIdKey }){

  try{ console.debug('CRUDTable init', { path, columns }) }catch(e){}
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const detectedIdKey = columns && columns.length ? columns[0].key : 'id'
  const idKey = propIdKey || detectedIdKey
  if(!path){
    return <div className="crud-root">No API path provided for CRUDTable</div>
  }
  if(!columns || !Array.isArray(columns) || columns.length === 0){
    return <div className="crud-root">No columns defined for CRUDTable</div>
  }
  const [form, setForm] = useState(() => {
    const obj = {}
    columns.forEach(c => { if (c.key !== idKey) obj[c.key] = '' })
    return obj
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(()=>{
    fetchList()
  },[path])

  async function fetchList(){
    setLoading(true)
    setError(null)
    try{
      const res = await fetch(`${API_BASE}/${path}`)
      if(!res.ok){
        let body = ''
        try{ body = await res.text() }catch(e){}
        throw new Error(`Failed to load ${path}: ${res.status} ${res.statusText} ${body}`)
      }
      const data = await res.json()
      setItems(data)
    }catch(err){
      console.error('CRUD fetchList error', err)
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  function handleChange(key, value){
    setForm(f => ({...f, [key]: value}))
  }

  async function handleAdd(e){
    e.preventDefault()
    setError(null)
    try{
      let res
      if(editingId){
        res = await fetch(`${API_BASE}/${path}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
      } else {
        res = await fetch(`${API_BASE}/${path}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
      }
      if(!res.ok){
        let body = ''
        try{ body = await res.text() }catch(e){}
        throw new Error(`Create failed: ${res.status} ${res.statusText} ${body}`)
      }
      await fetchList()
      // reset form
      const reset = {}
      columns.forEach(c => { if (c.key !== idKey) reset[c.key] = '' })
      setForm(reset)
      setEditingId(null)
    }catch(err){
      setError(err.message)
    }
  }

  function handleEdit(item){
    const reset = {}
    columns.forEach(c => { if (c.key !== idKey) reset[c.key] = item[c.key] ?? '' })
    setForm(reset)
    setEditingId(item[idKey] ?? item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancelEdit(){
    const reset = {}
    columns.forEach(c => { if (c.key !== idKey) reset[c.key] = '' })
    setForm(reset)
    setEditingId(null)
  }

  async function handleDelete(id){
    if(!confirm('Delete this entry?')) return
    try{
      const res = await fetch(`${API_BASE}/${path}/${id}`, { method: 'DELETE' })
      if(!res.ok){
        let body = ''
        try{ body = await res.text() }catch(e){}
        throw new Error(`Delete failed: ${res.status} ${res.statusText} ${body}`)
      }
      await fetchList()
    }catch(err){
      console.error('CRUD delete error', err)
      setError(err.message)
    }
    }

  return (
    <div className="crud-root">
      <div className="crud-status" style={{marginBottom:8,fontSize:13,color:'#374151'}}>
        {loading ? 'Loading...' : error ? `Error: ${error}` : `Loaded ${items.length} record(s)`}
      </div>

      <div className="crud-toolbar">
        <form className="crud-form" onSubmit={handleAdd}>
          {columns.filter(c=>c.key!==idKey).map(col=> (
            <input key={col.key}
              placeholder={col.label}
              value={form[col.key] || ''}
              onChange={e => handleChange(col.key, e.target.value)}
              className="crud-input"
            />
          ))}
          <button className="btn btn-primary" type="submit">{editingId ? 'Save' : 'Add'}</button>
          {editingId && <button type="button" className="btn" onClick={handleCancelEdit} style={{marginLeft:8}}>Cancel</button>}
        </form>
      </div>

      <div className="crud-table-wrap">
        {/* Always render table header and body; show messages inline */}
        <table className="crud-table">
          <thead>
            <tr>
              {columns.map(c=> <th key={c.key}>{c.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr><td colSpan={columns.length + 1} style={{textAlign:'center',padding:'1rem',color:'#b91c1c'}}>Error: {error}</td></tr>
            )}
            {!loading && !error && items.length === 0 && (
              <tr><td colSpan={columns.length + 1} style={{textAlign:'center',padding:'1rem',color:'#6b7280'}}>No records</td></tr>
            )}
            {items.map(item => (
              <tr key={item[idKey] ?? item.id}>
                {columns.map(c=> <td key={c.key}>{item[c.key]}</td>)}
                <td>
                  <button className="btn-ghost" onClick={()=> handleEdit(item)}>Edit</button>
                  <button className="btn-ghost" onClick={()=> handleDelete(item[idKey] ?? item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}