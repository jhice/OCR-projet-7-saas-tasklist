export default function MemberCheckbox({ member, fieldName, isChecked, checkHandler }) {
  return (
    <span>
      <input
        type="checkbox"
        name={fieldName}
        id={member.user.id}
        value={member.user.email}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={member.user.id} className="pl-2">{member.user.name}</label>
      <span>&nbsp;|&nbsp;</span>
    </span>
  )
}