class PhotoController {
  constructor() {}
  async store(req, res) {
    return res.json([{ msg: 'Aquivo foi enviado:' }, req.file]);
  }
}

//exportar já instanciado
export default new PhotoController();
