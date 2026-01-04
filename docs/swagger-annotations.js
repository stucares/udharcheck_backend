/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and registration
 *   - name: Loans
 *     description: Loan request management
 *   - name: Repayments
 *     description: Repayment tracking and management
 *   - name: Reports
 *     description: User reporting and moderation
 *   - name: Disputes
 *     description: Dispute management
 *   - name: Notifications
 *     description: User notifications
 *   - name: Admin
 *     description: Admin management endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *                 enum: [lender, borrower]
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               whatsapp:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password is incorrect
 */

/**
 * @swagger
 * /auth/onboarding:
 *   post:
 *     summary: Complete user onboarding with KYC documents
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               identityProof:
 *                 type: string
 *                 format: binary
 *               addressProof:
 *                 type: string
 *                 format: binary
 *               selfie:
 *                 type: string
 *                 format: binary
 *               panCard:
 *                 type: string
 *               aadharNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Onboarding completed successfully
 *       400:
 *         description: Validation error or missing files
 */

/**
 * @swagger
 * /auth/profile-picture:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: No file uploaded
 */

/**
 * @swagger
 * /auth/send-email-verification:
 *   post:
 *     summary: Send email verification code
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification code sent to email
 *       400:
 *         description: Email already verified
 */

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email with code
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired code
 */

/**
 * @swagger
 * /auth/send-phone-verification:
 *   post:
 *     summary: Send phone verification code
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification code sent to phone
 *       400:
 *         description: Phone already verified
 */

/**
 * @swagger
 * /auth/verify-phone:
 *   post:
 *     summary: Verify phone with code
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *     responses:
 *       200:
 *         description: Phone verified successfully
 *       400:
 *         description: Invalid or expired code
 */

/**
 * @swagger
 * /auth/create-admin:
 *   post:
 *     summary: Create admin user (admin only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Get all loan requests
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected, fulfilled, in_progress, completed, defaulted, disputed]
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [borrower, lender]
 *     responses:
 *       200:
 *         description: List of loan requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LoanRequest'
 *   post:
 *     summary: Create a new loan request
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - purpose
 *               - duration
 *             properties:
 *               amount:
 *                 type: number
 *                 format: decimal
 *               purpose:
 *                 type: string
 *               duration:
 *                 type: integer
 *                 description: Duration in days
 *               interestRate:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       201:
 *         description: Loan request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/LoanRequest'
 */

/**
 * @swagger
 * /loans/request:
 *   post:
 *     summary: Create a new loan request (borrower)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - purpose
 *               - duration
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 500
 *                 maximum: 1000000
 *               purpose:
 *                 type: string
 *               duration:
 *                 type: integer
 *                 minimum: 7
 *                 maximum: 365
 *                 description: Duration in days
 *     responses:
 *       201:
 *         description: Loan request created successfully
 *       400:
 *         description: Validation error or user not onboarded
 */

/**
 * @swagger
 * /loans/my-requests:
 *   get:
 *     summary: Get my loan requests (borrower)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of borrower's loan requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LoanRequest'
 */

/**
 * @swagger
 * /loans/pending:
 *   get:
 *     summary: Get pending loan requests (lender)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending loan requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LoanRequest'
 */

/**
 * @swagger
 * /loans/my-lending:
 *   get:
 *     summary: Get my lending history (lender)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of lender's loans
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LoanRequest'
 */

/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     summary: Get loan request by ID
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Loan request details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/LoanRequest'
 *       404:
 *         description: Loan request not found
 *   put:
 *     summary: Update loan request
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               purpose:
 *                 type: string
 *               duration:
 *                 type: integer
 *               interestRate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Loan request updated successfully
 */

/**
 * @swagger
 * /loans/{id}/accept:
 *   post:
 *     summary: Accept a loan request (lender)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interestRate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Loan request accepted
 */

/**
 * @swagger
 * /loans/{id}/fulfill:
 *   post:
 *     summary: Mark loan as fulfilled (money received)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Loan marked as fulfilled
 */

/**
 * @swagger
 * /loans/{id}/cancel:
 *   post:
 *     summary: Cancel a loan request (borrower)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Loan request cancelled successfully
 *       400:
 *         description: Cannot cancel loan in current status
 */

/**
 * @swagger
 * /loans/{id}/repayment:
 *   post:
 *     summary: Record a repayment (lender)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 1
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, bank_transfer, upi, cheque, other]
 *     responses:
 *       201:
 *         description: Repayment recorded successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /loans/{id}/rate:
 *   post:
 *     summary: Rate user after loan completion
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               review:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating submitted successfully
 *       400:
 *         description: Validation error or loan not eligible for rating
 */

/**
 * @swagger
 * /loans/{id}/repayments:
 *   get:
 *     summary: Get repayments for a loan
 *     tags: [Repayments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of repayments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Repayment'
 *   post:
 *     summary: Record a repayment
 *     tags: [Repayments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - paymentMethod
 *             properties:
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, bank_transfer, upi, cheque, other]
 *               transactionReference:
 *                 type: string
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Repayment recorded successfully
 */

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get all reports (admin only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 *   post:
 *     summary: File a report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - reportedUserId
 *               - reportType
 *               - description
 *             properties:
 *               reportedUserId:
 *                 type: string
 *                 format: uuid
 *               reportType:
 *                 type: string
 *                 enum: [fraud, harassment, non_payment, false_information, inappropriate_behavior, other]
 *               description:
 *                 type: string
 *                 minLength: 10
 *               evidence:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Report filed successfully
 */

/**
 * @swagger
 * /reports/my-reports:
 *   get:
 *     summary: Get my filed reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 */

/**
 * @swagger
 * /disputes:
 *   get:
 *     summary: Get all disputes
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of disputes
 *   post:
 *     summary: Raise a dispute
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - loanRequestId
 *               - disputeType
 *               - description
 *             properties:
 *               loanRequestId:
 *                 type: string
 *                 format: uuid
 *               disputeType:
 *                 type: string
 *                 enum: [payment_not_received, wrong_amount, unauthorized_charge, terms_violation, other]
 *               description:
 *                 type: string
 *                 minLength: 10
 *               evidence:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Dispute raised successfully
 */

/**
 * @swagger
 * /disputes/my-disputes:
 *   get:
 *     summary: Get my disputes
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's disputes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dispute'
 */

/**
 * @swagger
 * /disputes/{id}/note:
 *   post:
 *     summary: Add a note to a dispute
 *     tags: [Disputes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *             properties:
 *               note:
 *                 type: string
 *               evidence:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Note added successfully
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: unreadOnly
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 */

/**
 * @swagger
 * /notifications/unread-count:
 *   get:
 *     summary: Get unread notifications count
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Count of unread notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 */

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Notification marked as read
 */

/**
 * @swagger
 * /notifications/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [lender, borrower]
 *       - in: query
 *         name: verificationStatus
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get user details (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /admin/users/{id}/verify:
 *   put:
 *     summary: Verify a user (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - approve
 *             properties:
 *               approve:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User verification updated
 */

/**
 * @swagger
 * /admin/users/{id}/reject:
 *   put:
 *     summary: Reject user verification (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verification rejected
 */

/**
 * @swagger
 * /admin/users/{id}/partial-reject:
 *   put:
 *     summary: Partially reject user documents (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rejections
 *             properties:
 *               rejections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - type
 *                     - reason
 *                   properties:
 *                     type:
 *                       type: string
 *                       enum: [identity, address, selfie]
 *                     reason:
 *                       type: string
 *     responses:
 *       200:
 *         description: Documents partially rejected
 */

/**
 * @swagger
 * /admin/users/{id}/block:
 *   put:
 *     summary: Block or unblock a user (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - block
 *             properties:
 *               block:
 *                 type: boolean
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: User block status updated
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                     totalLoans:
 *                       type: integer
 *                     totalAmount:
 *                       type: number
 *                     pendingVerifications:
 *                       type: integer
 *                     activeDisputes:
 *                       type: integer
 */

/**
 * @swagger
 * /admin/reports:
 *   get:
 *     summary: Get all reports (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 */

/**
 * @swagger
 * /admin/reports/{id}:
 *   put:
 *     summary: Resolve a report (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, under_review, resolved, dismissed]
 *     responses:
 *       200:
 *         description: Report status updated
 */

/**
 * @swagger
 * /admin/disputes:
 *   get:
 *     summary: Get all disputes (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of disputes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dispute'
 */

/**
 * @swagger
 * /admin/disputes/{id}:
 *   put:
 *     summary: Resolve a dispute (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [open, under_review, resolved, closed]
 *     responses:
 *       200:
 *         description: Dispute status updated
 */

/**
 * @swagger
 * /admin/loans:
 *   get:
 *     summary: Get all loans (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all loans
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LoanRequest'
 */

/**
 * @swagger
 * /admin/settings:
 *   get:
 *     summary: Get all settings (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Settings'
 *   put:
 *     summary: Update a setting (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - value
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Setting updated successfully
 */

/**
 * @swagger
 * /admin/settings/initialize:
 *   post:
 *     summary: Initialize default settings (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Settings initialized successfully
 */

/**
 * @swagger
 * /admin/activity-logs:
 *   get:
 *     summary: Get activity logs (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ActivityLog'
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [admin, lender, borrower]
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phone:
 *           type: string
 *         whatsapp:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         pincode:
 *           type: string
 *         profilePhoto:
 *           type: string
 *         selfiePhoto:
 *           type: string
 *         governmentId:
 *           type: string
 *         governmentIdType:
 *           type: string
 *           enum: [aadhar, pan, voter_id, passport, driving_license]
 *         governmentIdNumber:
 *           type: string
 *         isIdVerified:
 *           type: boolean
 *         isFaceVerified:
 *           type: boolean
 *         emailVerified:
 *           type: boolean
 *         phoneVerified:
 *           type: boolean
 *         kycStatus:
 *           type: string
 *           enum: [pending, approved, rejected, partial_rejected]
 *         kycSubmittedAt:
 *           type: string
 *           format: date-time
 *         kycApprovedAt:
 *           type: string
 *           format: date-time
 *         kycRejectedAt:
 *           type: string
 *           format: date-time
 *         kycRejectionReason:
 *           type: string
 *         isOnboarded:
 *           type: boolean
 *         isBlocked:
 *           type: boolean
 *         blockReason:
 *           type: string
 *         creditScore:
 *           type: number
 *         totalLent:
 *           type: number
 *         totalBorrowed:
 *           type: number
 *         activeLoanCount:
 *           type: integer
 *         defaultCount:
 *           type: integer
 *         onTimePaymentCount:
 *           type: integer
 *         averageRating:
 *           type: number
 *         totalRatings:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     LoanRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         borrowerId:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *           format: decimal
 *         purpose:
 *           type: string
 *         duration:
 *           type: integer
 *           description: Duration in days
 *         interestRate:
 *           type: number
 *           format: decimal
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected, fulfilled, in_progress, completed, defaulted, disputed]
 *         lenderId:
 *           type: string
 *           format: uuid
 *         acceptedAt:
 *           type: string
 *           format: date-time
 *         fulfilledAt:
 *           type: string
 *           format: date-time
 *         completedAt:
 *           type: string
 *           format: date-time
 *         dueDate:
 *           type: string
 *           format: date-time
 *         totalRepayable:
 *           type: number
 *         amountRepaid:
 *           type: number
 *         remainingAmount:
 *           type: number
 *         isContactShared:
 *           type: boolean
 *         contactSharedAt:
 *           type: string
 *           format: date-time
 *         borrowerRating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         borrowerReview:
 *           type: string
 *         lenderRating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         lenderReview:
 *           type: string
 *         borrower:
 *           $ref: '#/components/schemas/User'
 *         lender:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Repayment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         loanRequestId:
 *           type: string
 *           format: uuid
 *         borrowerId:
 *           type: string
 *           format: uuid
 *         lenderId:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *         paymentDate:
 *           type: string
 *           format: date-time
 *         paymentMethod:
 *           type: string
 *           enum: [cash, bank_transfer, upi, cheque, other]
 *         transactionReference:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, confirmed, disputed]
 *         confirmedByLender:
 *           type: boolean
 *         confirmedAt:
 *           type: string
 *           format: date-time
 *         remarks:
 *           type: string
 *         isLate:
 *           type: boolean
 *         daysLate:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Report:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         reporterId:
 *           type: string
 *           format: uuid
 *         reportedUserId:
 *           type: string
 *           format: uuid
 *         loanRequestId:
 *           type: string
 *           format: uuid
 *         reportType:
 *           type: string
 *           enum: [fraud, harassment, non_payment, false_information, inappropriate_behavior, other]
 *         description:
 *           type: string
 *         evidence:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *           enum: [pending, under_review, resolved, dismissed]
 *         adminNotes:
 *           type: string
 *         resolvedAt:
 *           type: string
 *           format: date-time
 *         resolvedBy:
 *           type: string
 *           format: uuid
 *         actionTaken:
 *           type: string
 *         reporter:
 *           $ref: '#/components/schemas/User'
 *         reportedUser:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Dispute:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         loanRequestId:
 *           type: string
 *           format: uuid
 *         raisedById:
 *           type: string
 *           format: uuid
 *         againstUserId:
 *           type: string
 *           format: uuid
 *         disputeType:
 *           type: string
 *           enum: [payment_not_received, wrong_amount, unauthorized_charge, terms_violation, other]
 *         description:
 *           type: string
 *         disputedAmount:
 *           type: number
 *         evidence:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *           enum: [open, under_review, resolved, closed]
 *         resolution:
 *           type: string
 *         resolvedAt:
 *           type: string
 *           format: date-time
 *         resolvedBy:
 *           type: string
 *           format: uuid
 *         raisedBy:
 *           $ref: '#/components/schemas/User'
 *         againstUser:
 *           $ref: '#/components/schemas/User'
 *         loanRequest:
 *           $ref: '#/components/schemas/LoanRequest'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [loan_request, loan_accepted, loan_rejected, loan_fulfilled, payment_reminder, payment_received, payment_overdue, report_filed, report_resolved, account_blocked, account_unblocked, general]
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         relatedId:
 *           type: string
 *           format: uuid
 *         relatedType:
 *           type: string
 *         isRead:
 *           type: boolean
 *         readAt:
 *           type: string
 *           format: date-time
 *         sentViaSms:
 *           type: boolean
 *         sentViaWhatsapp:
 *           type: boolean
 *         sentViaEmail:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ActivityLog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         action:
 *           type: string
 *         description:
 *           type: string
 *         entityType:
 *           type: string
 *         entityId:
 *           type: string
 *           format: uuid
 *         metadata:
 *           type: object
 *         ipAddress:
 *           type: string
 *         userAgent:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Settings:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         key:
 *           type: string
 *         value:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *           enum: [string, number, boolean, json]
 *         category:
 *           type: string
 *         isActive:
 *           type: boolean
 *         updatedBy:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
