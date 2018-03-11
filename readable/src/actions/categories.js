export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export function createCategory ({
    name,
    path
  }) {
  return {
    type: CREATE_CATEGORY,
    name,
    path
  }
}
