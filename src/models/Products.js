export default class Products {
    static setData({ groups, allProducts}) {

        let menu = [];
        let groupsForCatalog = []
      
        // собираю id и имя групп товаров для каталога
        groupsForCatalog = groups.filter(group => !group.parent && group.showInCatalog)

        menu = groupsForCatalog.map((group) => {
          let data = {
            groupId: group.id,
            name: group.name,
            products: [],
          };
          allProducts.forEach((product) => {
            if (product.groupId === group.id) {
              data.products.push(product);
            }
          });
          return data;
        });


        return {
          menu,
        };
    }
}
