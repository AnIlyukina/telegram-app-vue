export default class Products {
    static setData({ groups, allProducts}) {

        let productList = []
        let groupsId = []

        groupsId = groups.filter(group => !group.parent && group.showInCatalog)

        productList = allProducts.filter(product => product.id === groupsId[0].id)
        console.log(groupsId, 'groupsId')


        return {
           productList
        }
    }
}
