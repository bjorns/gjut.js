module.exports = (function() {
  function count_instances(str, ch) { 
    return (str.length - str.replace(new RegExp(ch, "g"), '').length) / ch.length;
  }

  function count_linebreaks(str) {
    return count_instances(str, '\n')
  }

  return {
    count_linebreaks: count_linebreaks
  };
})();
