import SelectEelement from "react-select";
function Select(props: any) {
  return (
    <>
      <SelectEelement
        id={props.id}
        name={props.name}
        className={props.className}
        isMulti={props.isMulti}
        isDisabled={props.isDisabled}
        isClearable
        options={props.options}
        onChange={props.onChange}
        styles={props.styles}
        menuPortalTarget={props.menuPortalTarget}
        defaultValue={props.defaultValue}
      />
    </>
  );
}
export default Select;
