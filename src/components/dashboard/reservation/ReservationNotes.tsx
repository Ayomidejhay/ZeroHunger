interface ReservationNotesProps {
    notes: string;
}

const ReservationNotes = ({notes}: ReservationNotesProps) => {
  return (
    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
      <p className="text-sm font-medium mb-1 text-blue-800">Message from Recipient</p>
      <p className="text-sm text-blue-700">{notes}</p>
    </div>
  )
}

export default ReservationNotes