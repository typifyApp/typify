const removeAll = (originalSet, toBeRemovedSet) => {
  toBeRemovedSet.forEach(Set.prototype.delete, originalSet);
};

const SetUtils = {
  removeAll,
};

export default SetUtils;
