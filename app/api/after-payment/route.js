export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Menangkap data dari webhook
        const body = req.body;
  
        // Lakukan validasi data atau proses sesuai kebutuhan aplikasi Anda
        // Misalnya, Anda dapat melakukan sesuatu dengan data yang diterima dari webhook
        console.log('Data dari webhook:', body);
  
        // Balas dengan respons sukses ke Midtrans untuk menandakan penerimaan data
        res.status(200).json({ message: 'Webhook diterima dan diproses.' });
      } catch (error) {
        console.error('Gagal menangani webhook:', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam menangani webhook.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
  }