
interface valueObj {
  id: string;
  name: string
}

interface MultiSelectProps {
  label: string;
  name: string;
  value: valueObj[];
  onChange: (value: valueObj[]) => void;
  options: any[];
  disabled?: boolean
}


function MultiSelect({ label, value, onChange, options, name, disabled }: MultiSelectProps) {
  
  return (
    <div>
      <label className="block font-body text-base text-foreground/80 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value?.length > 0 && value?.map((v: any) => ( 
          <span key={v.id} className="px-3 py-1 rounded-full bg-primary text-background text-sm flex items-center gap-1">
            {v.name}
            <button type="button" className="ml-1 text-background/70 hover:text-background" onClick={() => onChange(value.filter((item: any) => item.id !== v.id))}>
              ×
            </button>
          </span>
        ))}
      </div>
      <select
        name={name}
        disabled={disabled}
        className="w-full border border-foreground/20 rounded-md px-3 py-2 bg-background text-foreground focus:ring-primary focus:border-primary font-body text-base"
        onChange={e => {

          const val = e.target.value;
          const text = e.target.options[e.target.selectedIndex].text;

          if (!value.length) {
            onChange([...value, { id: val, name: text }]);
          } else {
            const isSelected = value.some((item: any) => item.id === val)
            if (!isSelected) onChange([...value, { id: val, name: text }]);
          }
        }}
        value=""
      >
        <option value="">Select {label}</option>
        {options
          .filter((opt) => {
            const exists = value?.some((item) => {
              return Number(item.id) === opt.id;
            });
            return !exists;
          })
          .map((opt, index) => (
            <option key={`Index${index + 1}`} value={opt.id}>
              {opt.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default MultiSelect;