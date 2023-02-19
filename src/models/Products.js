export default class Products {
  static setData({ groups, allProducts }) {
    let menu = [];
    let groupsForCatalog = [];

    // собираю id и имя групп товаров для каталога
    groupsForCatalog = groups.filter(
      (group) => !group.parent && group.showInCatalog
    );

    menu = groupsForCatalog.map((group) => {
      let data = {
        groupId: group.id,
        name: group.name,
        products: [],
      };
      allProducts.forEach((product) => {
        if (product.groupId === group.id) {
          // тут надо подумать как написать лучше
          let result = {};
          result = this.setRelatedProducts(product, groups, allProducts);
          data.products.push(result);
        }
      });
      return data;
    });

    return {
      menu,
    };
  }

  static setRelatedProducts(product, groups, allProducts) {
    console.log(product, groups, allProducts);
    let relatedProduct = []
    let groupsForProduct = [];
    product.relatedProduct.forEach(related => {
      groups.forEach((group) => {
        if (group.id === related) {
          groupsForProduct.push(group);
        }
      });
    })

    relatedProduct = groupsForProduct.map((group) => {
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

    
    console.log(relatedProduct, "groupsForProduct");
    product.relatedProduct = relatedProduct;
    return product;
  }
}
