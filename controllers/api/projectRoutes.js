const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => { // Here is the post (from profile.js) (Yours will be very similar for the Project)
  try {
    const newProject = await Project.create({ // You will probably do Profile.create
      ...req.body,
      user_id: req.session.user_id, // Session is global
    });

    res.status(200).json(newProject); // This can be "Success!" or whatever you want for your project
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
