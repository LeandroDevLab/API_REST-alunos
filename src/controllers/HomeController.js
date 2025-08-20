class HomeController {
  constructor() {}
  index(req, res) {
    res.json({
      tudoCerto: true,
    });
  }
}

//exportar já instanciado
export default new HomeController();
