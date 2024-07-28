// middle-ellipsis.js
export default {
  bind(el, binding) {
    const text = binding.value;
    if (text && text.length > binding.arg) {
      const frontPart = text.slice(0, Math.floor(binding.arg / 2));
      const endPart = text.slice(-Math.floor(binding.arg / 2));
      el.innerHTML = `${frontPart}...${endPart}`;
      el.setAttribute('title', text);
    } else {
      el.innerHTML = text;
    }
  }
}
