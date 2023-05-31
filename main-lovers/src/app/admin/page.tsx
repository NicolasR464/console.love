import Image from 'next/image'
import CrudUser from './CrudAdmin';
import Dashboard from './Dashboard';

export default function AdminIndex() {
  return (
    <>
    <div className="mt-32 mx-40">
      <CrudUser />
      <Dashboard />
    </div>
    </>
  )
}
