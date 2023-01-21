const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Particulars = require("../models/Particulars");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },



//GET AGREEEMENTS 


getPartnershipAgreementForm:  (req, res) => {
  res.render('partnershipform.ejs')
},

getInfluencingAgreementForm:  (req, res) => {
  res.render('influencingform.ejs')
},

getOfferLetterForm:  (req, res) => {
  res.render('offerletter.ejs')
},

getEmployeeAgreementForm:  (req, res) => {
  res.render('employeeform.ejs')
},

getIndependentContractorAgreementForm:  (req, res) => {
  res.render('independentform.ejs')
},

getContractOfSaleForm:  (req, res) => {
  res.render('contractofsaleform.ejs')
},

getDeedOfAgreementForm:  (req, res) => {
  res.render('propertydeedform.ejs')
},

getMerchandisingAgreementForm:  (req, res) => {
  res.render('merchandisingform.ejs')
},

getPowerOfAttorneyForm:  (req, res) => {
  res.render('poaform.ejs')
},

getNotificationForm:  (req, res) => {
  res.render('notificationform.ejs')
},

getCoverLetterForm:  (req, res) => {
  res.render('coverletter.ejs')
},

getComplaintForm:  (req, res) => {
  res.render('complaintform.ejs')
},

getAppreciationForm:  (req, res) => {
  res.render('appreciationform.ejs')
},

getTerminationForm:  (req, res) => {
  res.render('terminationform.ejs')
},

getExtensionOfContractForm:  (req, res) => {
  res.render('extensionform.ejs')
},

getTenancyAgreementForm:  (req, res) => {
  res.render('tenancyform.ejs')
},

getLetterOfDemandForm:  (req, res) => {
  res.render('demandform.ejs')
},

getNoticeToQuitForm:  (req, res) => {
  res.render('noquitform.ejs')
},

getNoticeToRecoverPossessionForm:  (req, res) => {
  res.render('recoverpossessionform.ejs')
},

getBailForm:  (req, res) => {
  res.render('bailform.ejs')
},

getLeaseDeedForm: (req, res) => {
  res.render('leasedeed.ejs')
},

getDeedOfMortagageForm:  (req, res) => {
  res.render('mortgage.ejs')
},

getBillOfChargesForm:  (req, res) => {
  res.render('charges.ejs')
},

getWillsForm:  (req, res) => {
  res.render('wills.ejs')
},

getLetterOfAdministrationForm:  (req, res) => {
  res.render('codicil.ejs')
},

getMusicRecordingForm: (req, res) => {
  res.render('recording.ejs')
},

getProductionForm: (req, res) => {
  res.render('production.ejs')
},

getArtistManagementForm: (req, res) => {
  res.render('management.ejs')
},

getPublishingForm: (req, res) => {
  res.render('publishing.ejs')
},

getFeaturedArtistForm: (req, res) => {
  res.render('featuredartist.ejs')
},

getExclusiveAgentForm: (req, res) => {
  res.render('exclusiveagent.ejs')
},

getAdvertisingForm: (req, res) => {
  res.render('advertising.ejs')
},

getBillboardForm: (req, res) => {
  res.render('billboard.ejs')
},

getSocialMediaForm: (req, res) => {
  res.render('socialmedia.ejs')
},


//POST AGREEMENTS
/*postPartnership: async (req, res) => {
  try{
  await Particulars.create({
    firstparty: req.body.firstparty,
    firstpartyAdd: req.body.firstpartyAdd,
    secondparty: req.body.firstparty,
    secondpartyAdd: req.body.firstpartyAdd,
    place:req.body.place,
    toc: req.body.toc,
    firstpartyroles: req.body.firstpartyroles,
    secondpartyroles: req.body.secondpartyroles,
    profitsharing: req.body.profitsharing,
    createdAt:  req.body.createdAt,
    durationFrom: req.body.durationFrom,
    durationTo: req.body.durationTo,
    accountReviewDate:req.body.accountReviewDate

  })

      console.log('Particulars Uploaded');
        res.render("postpartnership.ejs")
} catch (err) {
  console.log(err)
}

}*/


postPartnership: async (req, res) => {
  try {
    const forms = await Particulars.find({ user: req.user.id });

    res.render("postpartnership.ejs", {  forms: forms, user: req.user,  });
  } catch (err) {
    console.log(err);
  }
},

};
