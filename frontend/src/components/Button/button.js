/**
 * generic button creator
 * @param{obj} config - button config(type, label)
 * @returns button element
 *
 */

export default function Button({config={}, handleSubmit=() => {} }) {
  return (
    <>
      <button type={config.type} onClick={(e) => handleSubmit(e)}>{config.label}</button>
    </>
  );
}
