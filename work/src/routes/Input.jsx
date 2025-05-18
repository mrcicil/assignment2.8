import styles from './Input.module.css';

function Input({ value, label, onChange, placeholder }) {

  const handlerChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input 
        
        className={styles.input} 
        onChange={handlerChange} 
        value={value} 
        placeholder={placeholder}
        required
  
      
       
      />
    </div>
  );
}
export default Input;