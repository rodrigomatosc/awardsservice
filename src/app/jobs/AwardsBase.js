class AwardsBase {
  prepare(awards = [], value = 0) {
    this.awards = awards;
    this.value = value;
  }

  result() {
    const result = this.awards.filter(award => {
      if (award.value <= this.value) {
        return award;
      }
    });

    return result;
  }
}

export default AwardsBase;
